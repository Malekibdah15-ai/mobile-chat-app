import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/Chat";
import { Types } from "mongoose";

export async function getChats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name email avatar")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    const formattedChats = chats.map((chat) => {
      const otherParticipant = chat.participants.find((p:any) => p._id.toString() !== userId);
      if (!otherParticipant) {
    // This prevents the "Cannot read _id of undefined" error on the frontend
    console.error("Participant missing in chat:", chat._id);
}
      

      return {
        _id: chat._id,
        participant: otherParticipant ?? null,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        createdAt: chat.createdAt,
      };
    });

    res.json(formattedChats);
  } catch (error) {
    res.status(500);
    next(error);
  }
}

export async function getOrCreateChat(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    // Fix: Cast to string to satisfy TS for Mongoose/Types.ObjectId
    const participantId = req.params.participantId as string;

    if (!participantId || !Types.ObjectId.isValid(participantId)) {
      return res.status(400).json({ message: "Invalid or missing participant ID" });
    }

    if (userId === participantId) {
      return res.status(400).json({ message: "Cannot create chat with yourself" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, participantId] },
    })
      .populate("participants", "name email avatar")
      .populate("lastMessage");

    if (!chat) {
      const newChat = new Chat({ participants: [userId, participantId] });
      await newChat.save();
      // Use execPopulate or a fresh find to ensure everything is loaded correctly
      chat = await Chat.findById(newChat._id)
        .populate("participants", "name email avatar");
    }

    // Safety check for participant extraction
    const otherParticipant = chat?.participants?.find(
      (p: any) => p._id.toString() !== userId?.toString()
    );

    res.json({
      _id: chat!._id,
      participant: otherParticipant ?? null,
      lastMessage: chat!.lastMessage,
      lastMessageAt: chat!.lastMessageAt,
      createdAt: chat!.createdAt,
    });
  } catch (error) {
    next(error);
  }
}
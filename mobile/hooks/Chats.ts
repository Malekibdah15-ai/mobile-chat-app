import { useApi } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Chat } from "@/types";

export const useChats = ()=>{
    const {apiWithAuth} = useApi()  
    return useQuery({
        queryKey: ["chats"],
        queryFn: async ()=>{
            const {data} = await apiWithAuth<Chat[]>({
                method: "GET", url: "/chats"
            })
            return data
        }
    })
}

export const useGetOrCreateChat  = () =>{
    const {apiWithAuth} = useApi()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(participantId: string)=>{
            const {data} = await apiWithAuth<Chat>({
                method: "POST",
                url: `/chats/with/${participantId}`
            })
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    })
}
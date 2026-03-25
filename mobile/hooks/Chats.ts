import { useApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
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
'use client'

import { useEffect, useState } from "react";


interface Post {
    title: string;
    userId: number;
    id: number;
    body: string;
}

function FetchPosts() {
    
    const [data , setData] = useState<Post[]>([]);
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch("/api/external",{
                    method: 'GET',
                    headers:{
                        "Content_Type": "application/json",
                    },
                });
                const result = await response.json();
                setData(result?.data)
            }catch(error) {
                console.error("Error fetch Data",error)
            }finally {
                setLoading(false);
              }
        }
        fetchData();
    },[])

    return (
        <div className="min-h-screen bg-gray-900 text-black p-4">
        <h1 className="text-center text-3xl font-bold mb-6 text-white">
          Posts
        </h1>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-solid border-black"></div>
        </div>
        
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 shadow-md rounded-lg p-4 transition transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-white mt-2 line-clamp-3">{item.body}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-white">
                      User : {item.userId}
                    </span>
                    
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No data available
              </p>
            )}
          </div>
        )}
      </div>
    )
}

export default FetchPosts




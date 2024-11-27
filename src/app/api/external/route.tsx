
import { NextResponse } from 'next/server'
 
export async function GET() {

  try{
    const respone =await fetch("https://jsonplaceholder.typicode.com/posts")

    if(!respone.ok){

      return NextResponse.json({ 
        success: false,
        message: "Your request has been faild please try again!"
      })
    }
    const data = await respone.json()
    if(respone.ok){
      return NextResponse.json({
        success: true,
        data: JSON.parse(JSON.stringify(data))
      })
    }
  } catch (error: unknown) {
    return NextResponse.json({
        success: false,
        message: "internal server error",
        error,
    })
}
}
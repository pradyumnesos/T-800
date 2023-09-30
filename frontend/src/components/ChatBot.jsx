import React, { useEffect, useState } from 'react'




export const ChatBot = ({socket}) => {


    const [Messgaes,setMessages]=useState([]);


    const [input,setInput]=useState("");


const [open,setOpen]=useState(true);


  


    useEffect(()=>{

        if(socket  !=null){

            socket.on('recieve',(messageData)=>{

                console.log(messageData);
    
    
                setMessages([...Messgaes,{...messageData,self:false}]);
    
            })
    

        }
       
        
    })



    function sendMessage(){

socket.emit('message',{message:input})


setMessages([...Messgaes,{message:input,self:true}])

setInput("");
    }


  return (
    <div>


    <div class=" bg-indigo-50 flex flex-col  w-max	 ">

  <div class={ open ?"w-60 h-80  flex flex-col border shadow-md bg-white":"flex flex-col border shadow-md bg-white"}>
    <div class="flex items-center justify-between border-b p-2">
      <div class="flex items-center">
        <img class="rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <div class="pl-2">
          <div class="font-semibold">
            <a class="hover:underline" href="#">John Do</a>
          </div>
          <div class="text-xs text-gray-600">Online</div>
        </div>
      </div>
    
      <div>
        <a class="inline-flex hover:bg-indigo-50 rounded-full p-2" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </a>

        <button class="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={()=>setOpen(!open)}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

   <div></div>

   <div></div>

   
    <div  class="flex-1 px-4 py-4 overflow-y-auto">

    { open && Messgaes.map((msg,idx)=>(

<div  key={idx} class={ msg.self?  `flex items-center mb-4`:`flex items-center flex-row-reverse mb-4`}>
<div class="flex-none flex flex-col items-center space-y-1 mr-4">
  <img class="rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
  <a href="#" class="block text-xs hover:underline">John Doe</a>
</div>
<div class={((msg.self)?(` bg-indigo-400`):` bg-green-200`) +` flex-1  text-white p-2 rounded-lg mb-2 relative`}>
  <div>{msg.message}.</div>


</div>
</div>

    ))

    
    }

      {/* <div class="flex items-center flex-row-reverse mb-4">
        <div class="flex-none flex flex-col items-center space-y-1 ml-4">
          <img class="rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
          <a href="#" class="block text-xs hover:underline">Jesse</a>
        </div>
        <div class="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>

          <div class="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
        </div>
      </div> */}

   
    
    </div>

    <div class="flex items-center border-t p-2">
    
  

      <div class="w-full mx-2">
        <input class="w-full rounded-full border p-2.5 border-gray-200" type="text" value={input} placeholder="send" autofocus onChange={(e)=>setInput(e.target.value)} />
      </div>

 
      <div>
        <button class="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={()=>sendMessage(input)}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

    </div>

    
  </div>

</div>

        </div>
  )


}

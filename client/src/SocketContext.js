import React , {useEffect,useState,useRef,useContext, createContext} from 'react'
import {io} from 'socket.io-client'
import {Peer} from 'peerjs'

const socket = io('http://localhost:5000')

const SocketContext = createContext()

const ContextProvider = ({children}) => {

    const[moPeer,setMoPeer] = useState(null) 
    const [socketId,setSocketId] = useState(null)
    const [stream,setStream] = useState(null)
    const [calls,setCall] = useState({})
    const [callAccepted,setCallAccepted] = useState(false)
    const [callEnded,setCallEnded] = useState(false)
    const [allUsers,setAllUsers] = useState([])
    const [username,setUsername] = useState("")
    const [recipientName,setRecipientName] = useState("")

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentStream) => {

            setStream(currentStream)
            myVideo.current.srcObject = currentStream
            // myVideo.current.srcObject = currentStream
        
        })

        socket.on('getId',(socketId) => {
            // setSocketId(socketId)
        })

        

        

        socket.on('callaccepted',(data) => {
            console.log(data.from + " accepted the call")
            setCallAccepted(true)
        })


        socket.on('leavecall',(leaver) => {
            console.log(`${leaver} left`)
            leaveCall()
        })


        const peer = new Peer()
        setMoPeer(peer)

            peer.on('open',(id) => {
                setSocketId(id)
                socket.emit('joinSelf',id)
            })


        
            
        
    },[])

    useEffect(() => {
        if(moPeer && socketId && userVideo)
        {

            socket.on('calluser',({from}) => {
                setCall({isRecievedCall:true,from})
                console.log(from)
                answerCall(from)
            })
        }
    },[moPeer,socketId])



    const answerCall = (from) => {
        setCallAccepted(true)

        // const moPeer = new Peer(socketId)
        console.log(moPeer)
        console.log(from)
        socket.emit('answercall',{to:from,from:socketId})

        moPeer.on("call", (call) => {
            call.answer(stream)
            call.on("stream", (remoteStream) => {
			    // Show stream in some <video> element.
                // userVideo.current.srcObject = remoteStream
                console.log("recieving")
                myVideo.current.srcObject = stream
                userVideo.current.srcObject = remoteStream
		});
        })
    }
    const callUser = (id) => {
        // const peer = new Peer(socketId);
        
        const call = moPeer.call(id, stream);
        console.log("calling: "+id)
        console.log(call)

        
		call.on("stream", (remoteStream) => {
            // Show stream in some <video> element.
            // userVideo.current.srcObject = remoteStream
            if(userVideo.current)
            {
                myVideo.current.srcObject = stream
                userVideo.current.srcObject = remoteStream
            }
            console.log("recieved remote user")
		});


        socket.emit('calluser',{from:socketId,userToCall:id})
    }


    const leaveCall = (id) => {
        setCallEnded(true)

        if(id)socket.emit('leavecall',{to:id,user:socketId})
        else socket.emit('leavecall',{to:socketId,user:id})
        if(moPeer)
        {
            moPeer.destroy()
        }
        window.location.reload()
    }



    return(
        <SocketContext.Provider value={{callAccepted,myVideo,userVideo,callEnded,socketId,callUser,answerCall,leaveCall,stream,allUsers,setUsername,username,recipientName}}>
            {children}
        </SocketContext.Provider>
        )

}


export {ContextProvider,SocketContext}
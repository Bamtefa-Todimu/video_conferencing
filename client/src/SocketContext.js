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

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio:true,video:true})
        .then((currentStream) => {

            setStream(currentStream)
            // myVideo.current.srcObject = currentStream
        
        })

        socket.on('getId',(socketId) => {
            // setSocketId(socketId)
        })

        socket.on('calluser',({signal,name:callerName,from}) => {
            setCall({isRecievedCall:true,signal,name:callerName,from})
        })

        const peer = new Peer()

            peer.on('open',(id) => {
                setSocketId(id)
            })

            setMoPeer(peer)

        

        
    },[])


    useEffect(() => {

        if(myVideo.current)
        {
                    myVideo.current.srcObject = stream
            
            moPeer.on("call", (call) => {
                call.answer(stream)
                console.log("from call")
                console.log(call)
                setCallAccepted(true)
                call.on("stream", (remoteStream) => {
                    // Show stream in some <video> element.
                    userVideo.current.srcObject = remoteStream
		});
        })
        }

    },[stream])


    const answerCall = () => {
        setCallAccepted(true)

        // const moPeer = new Peer(socketId)

        moPeer.on("call", (call) => {
            call.answer(stream)
            call.on("stream", (remoteStream) => {
			    // Show stream in some <video> element.
                userVideo.current.srcObject = remoteStream
		});
        })
    }
    const callUser = (id) => {
        // const peer = new Peer(socketId);

        const call = moPeer.call(id, stream);
        console.log("calling: "+id)
		call.on("stream", (remoteStream) => {
			// Show stream in some <video> element.
            userVideo.current.srcObject = remoteStream
            console.log(remoteStream)
		});
    }


    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
        window.location.reload()
    }



    return(
        <SocketContext.Provider value={{callAccepted,myVideo,userVideo,callEnded,socketId,callUser,answerCall,leaveCall,stream}}>
            {children}
        </SocketContext.Provider>
        )

}


export {ContextProvider,SocketContext}
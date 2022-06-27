import React , {useEffect,useState,useRef,useContext, createContext} from 'react'
import {io} from 'socket.io-client'
import {Peer} from 'peerjs'

const socket = io('http://localhost:5000')

const SocketContext = createContext()

const ContextProvider = ({children}) => {

    const[moPeer,setMoPeer] = useState(null) 
    const [socketId,setSocketId] = useState(null)
    const [recId,setRecId] = useState(null)
    const [callerId,setCallerId] = useState("")
    const [stream,setStream] = useState(null)
    const [calls,setCall] = useState({})
    const [callAccepted,setCallAccepted] = useState(false)
    const [callEnded,setCallEnded] = useState(false)
    const [allUsers,setAllUsers] = useState([])
    const [username,setUsername] = useState("")
    const [recipientName,setRecipientName] = useState("")

    const [muted,setMuted] = useState(false)
    const [remoteMuted,setRemoteMuted] = useState(false)

    const [videoHidden,setVideoHidden] = useState(false)
    const [remoteVideoHidden,setRemoteVideoHidden] = useState(false)


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
            setRecipientName(data.recipientName)
            console.log(data.recipientName)
            setCallAccepted(true)
        })


        socket.on('leavecall',(leaver) => {
            console.log(`${leaver} left`)
            leaveRes()
        })


        const peer = new Peer()
        setMoPeer(peer)

            peer.on('open',(id) => {
                setSocketId(id)
                socket.emit('joinSelf',id)
            })


        
            
        
    },[])

    useEffect(() => {
        if(moPeer && socketId && userVideo && username)
        {

            socket.on('calluser',({from,caller}) => {
                setCall({isRecievedCall:true,from})
                setRecipientName(caller)
                setCallerId(from)
                answerCall(from)
               
            })


            socket.on('muteAudio',({from}) => {
                if(remoteMuted)
                {
                    userVideo.current.muted = false
                    setRemoteMuted(false)
                }
                else
                {
                    userVideo.current.muted = true
                    setRemoteMuted(true)
                }
            })

            socket.on('hideVideo',({from}) => {
                if(!remoteVideoHidden)
                {
                    userVideo.current.autoplay = false
                    userVideo.current.load()
                    console.log('hiding remote video')
                    setRemoteVideoHidden(true)
                }
                else
                {
                    userVideo.current.autoplay = true
                    userVideo.current.load()
                    console.log('unhiding remote video')

                    setRemoteVideoHidden(false)
                }
            })
        }
    },[moPeer,socketId,username,remoteMuted,remoteVideoHidden])



    const answerCall = (from) => {
        setCallAccepted(true)

        // const moPeer = new Peer(socketId)
        console.log(moPeer)
        console.log(from)
        socket.emit('answercall',{to:from,from:socketId,recipientName:username})

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
        setRecId(id)
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


        socket.emit('calluser',{from:socketId,userToCall:id,callerName:username})
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

    const leaveRes = () => {
        setCallEnded(true)
        if(moPeer)moPeer.destroy()
        window.location.reload()
        
    }


    const handleMuteAudio = () => {
        if(recId)
        {
            socket.emit('muteAudio',recId)
        }
        else
        {
            socket.emit('muteAudio',socketId)
            
        }

        if(muted)
        {
             myVideo.current.muted = false
            setMuted(false)
        }
        else
        {   
            myVideo.current.muted = true
            setMuted(true)
        }

    }

    const handleHideVideo = () => {
        if(recId)
        {
            socket.emit('hideVideo',recId)
        }
        else
        {
            socket.emit('hideVideo',socketId)
            
        }

        if(!videoHidden)
        {
            myVideo.current.autoplay = false
            myVideo.current.load()
            setVideoHidden(true)
        }
        else
        {   
            myVideo.current.autoplay = true
            myVideo.current.load()
            setVideoHidden(false)
        }
    }



    return(
        <SocketContext.Provider value={{callAccepted,myVideo,userVideo,callEnded,socketId,callUser,answerCall,leaveCall,stream,allUsers,setUsername,username,recipientName,recId,
            handleMuteAudio,muted,remoteMuted,videoHidden,remoteVideoHidden,handleHideVideo,calls,setCall,callerId}}>
            {children}
        </SocketContext.Provider>
        )

}


export {ContextProvider,SocketContext}
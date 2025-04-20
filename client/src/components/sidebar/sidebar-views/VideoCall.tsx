import { useAppContext } from '@/context/AppContext';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';


const VideoCall = () => {
    const { users } = useAppContext()
    const username = users[0]?.username;
    console.log(users[0]?.username) // Access the first user's username if it exists
    const { roomId } = useParams();
    const myMeeting = async(element: HTMLDivElement | null) => {
        const appID = 1437060089;
        const serverSecret = "59ba6fa86880690eda9c1180a894d4d7";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId as string, 
        Date.now().toString(), username

        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference
            }
        })
    }

    return(
        <div className=' '>
            <div 
                className=' bg-dark border-t border-darkHover  flex items-center justify-center text-white'
                ref={myMeeting}
                style={{ width: '40vw', height: '40vh' }}
            />
        
        </div>
    )
}
export default VideoCall;

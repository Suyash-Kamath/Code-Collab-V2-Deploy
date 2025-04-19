import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton";
import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import { useViews } from "@/context/ViewContext";
import useResponsive from "@/hooks/useResponsive";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ACTIVITY_STATE } from "@/types/app";
import { SocketEvent } from "@/types/socket";
import { VIEWS } from "@/types/view";
import { IoCodeSlash } from "react-icons/io5";
import { MdOutlineDraw } from "react-icons/md";
import cn from "classnames";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { tooltipStyles } from "./tooltipStyles";

function Sidebar() {
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
        setIsSidebarOpen,
    } = useViews();
    const { minHeightReached } = useResponsive();
    const { activityState, setActivityState } = useAppContext();
    const { socket } = useSocket();
    const { isMobile } = useWindowDimensions();
    const [showTooltip, setShowTooltip] = useState(true);

    const changeState = () => {
        setShowTooltip(false);
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING);
            socket.emit(SocketEvent.REQUEST_DRAWING);
        } else {
            setActivityState(ACTIVITY_STATE.CODING);
        }

        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            <div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-4 border-t border-darkHover bg-dark p-2 shadow-lg backdrop-blur-lg md:static md:h-full md:w-[60px] md:min-w-[60px] md:flex-col md:border-r md:border-t-0 md:p-3 md:pt-5 transition-all duration-300 ease-in-out rounded-xl",
                    {
                        hidden: minHeightReached,
                    }
                )}
            >
                {Object.values(VIEWS).map((view) => (
                    <SidebarButton key={view} viewName={view} icon={viewIcons[view]} />
                ))}

                {/* Activity State Button */}
                <div className="flex items-center justify-center mt-auto">
                    <button
                        className="flex items-center justify-center rounded-xl bg-darkHover p-2 transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:scale-105 shadow-md"
                        onClick={changeState}
                        onMouseEnter={() => setShowTooltip(true)}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === ACTIVITY_STATE.CODING
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                    >
                        {activityState === ACTIVITY_STATE.CODING ? (
                            <MdOutlineDraw size={30} className="text-gray-200" />
                        ) : (
                            <IoCodeSlash size={30} className="text-gray-200" />
                        )}
                    </button>
                    {showTooltip && (
                        <Tooltip
                            id="activity-state-tooltip"
                            place="right"
                            offset={15}
                            className="!z-50"
                            style={tooltipStyles}
                            noArrow={false}
                            positionStrategy="fixed"
                            float={true}
                        />
                    )}
                </div>
            </div>
            <div
                className="absolute left-0 top-0 z-20 w-full flex-col bg-dark md:static md:min-w-[280px] shadow-md rounded-xl  transition-all duration-300 border border-gray-600 backdrop-blur-lg overflow-hidden"
                style={isSidebarOpen ? {} : { display: "none" }}
            >
                {/* Render the active view component */}
                <div className=" bg-gray-900 rounded-lg shadow-lg max-h-screen overflow-y-auto">
                    {viewComponents[activeView]}
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;

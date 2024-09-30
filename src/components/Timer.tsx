import {IonCard, IonCardContent, IonText} from "@ionic/react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const Timer = () => {
    const [lastCigaretteDate, setLastCigaretteDate] = useState<number | null>(null);
    const [lastCigaretteTimer, setLastCigaretteTimer] = useState("0d 0h 0m 0s");
    const [timerColor, setTimerColor] = useState("primary");
    const userGoal = useSelector((state: any) => state.user.userGoal);
    const lastCigarette = useSelector((state: any) => state.user.lastCigarette);

    const goalCigarettesPerDay = userGoal.goal || 14; // Default to 14 if not defined

    useEffect(() => {
        if (!lastCigarette?.smokedAt) return;

        const date = new Date(lastCigarette.smokedAt);
        const lastCigaretteTimestamp = date.getTime();
        setLastCigaretteDate(lastCigaretteTimestamp);
    }, [lastCigarette]);

    useEffect(() => {
        if (lastCigaretteDate === null) return;

        // Calculate the ideal time between cigarettes based on the user's goal
        const idealInterval = (24 / goalCigarettesPerDay) * 60 * 60 * 1000; // Time in milliseconds
        const earlyThreshold = idealInterval * 0.5; // Early warning at 50% of the ideal interval
        const closeToIdealThreshold = idealInterval * 0.75; // Close to ideal at 75%

        // Update the timer every second
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeDifference = now - lastCigaretteDate;

            // Convert time difference to hours, minutes, seconds
            const seconds = Math.floor((timeDifference / 1000) % 60);
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            let timerString = `${days}d ${hours}h ${minutes}m ${seconds}s ago`;
            setLastCigaretteTimer(timerString);

            if (timeDifference < earlyThreshold) {
                setTimerColor('danger');
            } else if (timeDifference < closeToIdealThreshold) {
                setTimerColor('primary');
            } else if (timeDifference < idealInterval) {
                setTimerColor('warning');
            } else {
                setTimerColor('success');
            }

        }, 1000);

        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, [lastCigaretteDate, goalCigarettesPerDay]);


    return (
        <>
            <IonCard>
                <IonCardContent>
                    <IonText>
                        <IonText color={timerColor}>
                            <h1 className={"text-lg text-center font-bold"}>⏰ {lastCigarette ? lastCigaretteTimer : 'Let me know when you smoke!'}</h1>
                        </IonText>
                    </IonText>
                </IonCardContent>
            </IonCard>
        </>
    )
}

export default Timer;
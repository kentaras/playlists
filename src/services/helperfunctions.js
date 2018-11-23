export default class {

    //Method to copy state array

    static cloneArray(array) {
        return JSON.parse(JSON.stringify(array));
    }

    static getDurationTime(positionSeconds, val) {
        if(val === 'min'){
            let minutes = Math.floor(positionSeconds/60)
            if(minutes < 10){
                return '0' + minutes
            } else{
                return minutes
            }
        } else if(val === 'sec') {
            let seconds = Math.floor(positionSeconds % 60)
            if (seconds < 10) {
                return '0' + seconds
            } else {
                return seconds
            }
        }
    }

}
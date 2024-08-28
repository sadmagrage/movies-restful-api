export class DurationDto {
    hours: number;
    minutes: number;

    getSeconds(): string {
        let minutes = this.minutes;

        minutes += this.hours * 60;

        const seconds = minutes * 60;

        const secondsInString = seconds.toString();

        return secondsInString;
    }
}
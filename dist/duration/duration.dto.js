"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurationDto = void 0;
class DurationDto {
    getSeconds() {
        let minutes = this.minutes;
        minutes += this.hours * 60;
        const seconds = minutes * 60;
        const secondsInString = seconds.toString();
        return secondsInString;
    }
}
exports.DurationDto = DurationDto;
//# sourceMappingURL=duration.dto.js.map
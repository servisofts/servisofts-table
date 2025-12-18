var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import SLanguage from '../SLanguage';
import CalendarParams from './data';
import CalendarParamsEn from './data_en';
var SDate = /** @class */ (function () {
    function SDate(date, format) {
        this.language = SLanguage.language;
        if (!date) {
            this.date = new Date();
            return;
        }
        if (typeof date == "string") {
            if (!format) {
                this.date = new Date(date);
            }
            else {
                this.date = SDate.parse(date, format);
                // console.log(this.date);
            }
        }
        else {
            this.date = date;
        }
    }
    SDate.formatCero = function (val) {
        var txt = val + "";
        if (txt.length > 1) {
            return val;
        }
        return "0" + val;
    };
    SDate.toString = function (dateStr, props) {
        var _a;
        if (!dateStr)
            return "";
        var date;
        if (props.fromFormat) {
            date = new SDate(dateStr, props.fromFormat);
        }
        else {
            date = new SDate(dateStr, (_a = props.fromFormat) !== null && _a !== void 0 ? _a : 'yyyy-MM-ddThh:mm:ss');
        }
        return date.toString(props.toFormat);
    };
    SDate.parse = function (fecha, format) {
        if (!format) {
            format = "yyyy-MM-dd hh:mm";
        }
        var myRe = new RegExp('(yyyy)|(MM)|(dd)|(hh)|(HH)|(MONTH)|(MON)|(mm)|(ss)|(\\.[s]*)|(TZD)', 'g');
        // var res = [...format.matchAll(myRe)];
        // var res = Array.from(format.matchAll(myRe));
        // res = [...res];
        var match;
        var res = [];
        while ((match = myRe.exec(format)) !== null) {
            res.push(match);
        }
        var date = {};
        var indexExtra = 0;
        res.map(function (obj) {
            var temp = fecha.substring(obj.index + indexExtra, obj.index + (obj[0].length + indexExtra));
            if (obj[0] == "TZD") {
                // indexExtra += 3;
                temp = fecha.substring(fecha.length - 6, fecha.length);
            }
            if (obj[0] == "HH") {
                // 11:00 PM -> 23:00
                // if(fecha.length>)
                temp = fecha.substring(obj.index + indexExtra, obj.index + indexExtra + (obj[0].length + 5));
                if (temp.split(":")[0].length > 1) {
                    temp = fecha.substring(obj.index + indexExtra, obj.index + indexExtra + (obj[0].length + 6));
                    indexExtra += 1;
                }
                indexExtra += 5;
            }
            if (obj[0] == "MONTH") {
                // 11:00 PM -> 23:00
                // if(fecha.length>)
                console.log("aca parcea a month", fecha);
                temp = fecha.substring(obj.index + indexExtra, obj.index + indexExtra + (obj[0].length + 5));
                // if (temp.split(":")[0].length > 1) {
                //     temp = fecha.substring(obj.index + indexExtra, obj.index + indexExtra + (obj[0].length + 6));
                //     indexExtra += 1;
                // }
                indexExtra += 5;
            }
            date[obj[0]] = temp;
        });
        // var ISOf = "yyyy-MM-ddThh:mm:ss-04:00"
        var ISOf = "yyyy-MM-ddThh:mm:ss";
        if (date["TZD"]) {
            ISOf = ISOf + "TZD";
        }
        if (date["HH"]) {
            var strhh = date["HH"]; // 11:00 PM -> 23:00
            var p1 = strhh.split(" ")[0];
            var hh = parseInt(p1.split(":")[0]);
            var mm = parseInt(p1.split(":")[1]);
            var p2 = strhh.split(" ")[1];
            if (p2 == "PM") {
                hh += 12;
            }
            date["hh"] = hh < 10 ? "0" + hh : hh;
            date["mm"] = mm < 10 ? "0" + mm : mm;
        }
        ISOf = ISOf.replace("yyyy", date["yyyy"] || "1999");
        ISOf = ISOf.replace("MM", date["MM"] ? date["MM"] : "01");
        ISOf = ISOf.replace("dd", date["dd"] ? date["dd"] : "01");
        ISOf = ISOf.replace("hh", date["hh"] || "00");
        ISOf = ISOf.replace("mm", date["mm"] || "00");
        ISOf = ISOf.replace("ss", date["ss"] || "01.000");
        // ISOf = ISOf.replace(".s", date[".s"] || "1");
        if (date["TZD"]) {
            ISOf = ISOf.replace("TZD", date["TZD"]);
            // ISOf = ISOf + date["TZD"]
        }
        var dateFina = new Date(ISOf);
        return dateFina;
    };
    SDate.prototype.setLanguage = function (e) {
        this.language = e;
    };
    SDate.prototype.getLanguage = function () {
        return this.language;
    };
    SDate.prototype.isValid = function () {
        var d = this.date;
        if (isNaN(d)) {
            return false;
        }
        return true;
    };
    SDate.prototype.clone = function () {
        return new SDate(new Date(this.date.getTime()));
    };
    // addTime() {
    //     this.date.set
    // }
    SDate.prototype.getTimezone = function () {
        var date = new Date();
        var offsetMinutes = date.getTimezoneOffset();
        // Convertir los minutos de diferencia a horas y minutos
        var offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
        var offsetRemainingMinutes = Math.abs(offsetMinutes) % 60;
        // Determinar el signo según si la zona está adelante (+) o detrás (-) de UTC
        var sign = offsetMinutes <= 0 ? "+" : "-";
        var timezoneOffset = "".concat(sign).concat(String(offsetHours).padStart(2, '0'), ":").concat(String(offsetRemainingMinutes).padStart(2, '0'));
        return timezoneOffset;
    };
    SDate.prototype.getTimezoneOffset = function () {
        var date = new Date();
        return date.getTimezoneOffset();
    };
    SDate.prototype.setHours = function (hours, min, sec, ms) {
        this.date.setHours(hours, min, sec, ms);
        return this;
    };
    SDate.prototype.getTime = function () {
        return this.date.getTime();
    };
    SDate.prototype.getDay = function () {
        return this.date.getDate();
    };
    SDate.prototype.setDay = function (val) {
        this.date.setDate(val);
        return this;
    };
    SDate.prototype.addDay = function (val) {
        this.date.setDate(this.date.getDate() + val);
        return this;
    };
    SDate.prototype.addMonth = function (val) {
        this.date.setMonth(this.getMonth() - 1 + val);
        return this;
    };
    SDate.prototype.addYear = function (val) {
        this.date.setFullYear(this.date.getFullYear() + val);
        return this;
    };
    SDate.prototype.addHour = function (val) {
        this.date.setHours(this.date.getHours() + val);
        return this;
    };
    SDate.prototype.addMinute = function (val) {
        this.date.setMinutes(this.date.getMinutes() + val);
        return this;
    };
    SDate.prototype.addSecond = function (val) {
        this.date.setSeconds(this.date.getSeconds() + val);
        return this;
    };
    SDate.prototype.addMillisecond = function (val) {
        this.date.setMilliseconds(this.date.getMilliseconds() + val);
        return this;
    };
    SDate.prototype.getMonth = function () {
        return this.date.getMonth() + 1;
    };
    SDate.prototype.getYear = function () {
        return this.date.getFullYear();
    };
    SDate.prototype.setYear = function (val) {
        this.date.setFullYear(val);
        return this;
    };
    SDate.prototype.getMonthJson = function () {
        return SDate.getMonth(this.getMonth(), this.language);
    };
    SDate.prototype.getDayOfWeek = function () {
        var day = this.date.getDay();
        if (day - 1 < 0) {
            day = 7;
        }
        day = day - 1;
        return day;
    };
    SDate.prototype.getDayOfWeekJson = function () {
        return SDate.getDayOfWeek(this.getDayOfWeek(), this.language);
    };
    SDate.prototype.getFirstDayOfWeek = function () {
        var day = this.getDayOfWeek();
        var date = this.clone();
        date.setDay(date.getDay() - day);
        return date;
    };
    SDate.prototype.getWeek = function () {
        var date = new SDate(this.getYear() + "-01-01", "yyyy-MM-dd");
        var day = date.getFirstDayOfWeek();
        return Math.floor(this.diff(day) / 7) + 1;
    };
    SDate.prototype.equalDay = function (sdate) {
        if (this.toString("yyyy-MM-dd") == sdate.toString("yyyy-MM-dd")) {
            return true;
        }
        return false;
    };
    SDate.prototype.isAfter = function (sdate) {
        if (this.getTime() >= sdate.getTime()) {
            return true;
        }
        return false;
    };
    SDate.prototype.isBefore = function (sdate) {
        if (this.getTime() <= sdate.getTime()) {
            return true;
        }
        return false;
    };
    SDate.prototype.diffTime = function (sdate) {
        var date1 = this.date;
        var date2 = sdate.date;
        if (!date2)
            return 0;
        var timeDiff = date2.getTime() - date1.getTime();
        return timeDiff;
    };
    SDate.prototype.diff = function (sdate) {
        var date1 = this.date;
        var date2 = sdate.date;
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };
    SDate.prototype.__selectLanguage = function (_a) {
        var en = _a.en, es = _a.es;
        if (this.language == "en") {
            return en;
        }
        return es;
    };
    SDate.prototype.timeSince = function (sdate) {
        var date1 = this.date;
        var date2 = sdate.date;
        var seconds = Math.floor((date2.getTime() - date1.getTime()) / 1000);
        var lbl = "";
        var interval = seconds / 31536000;
        if (interval > 1) {
            lbl = interval > 1 ? this.__selectLanguage({ en: "years", es: "años" }) : this.__selectLanguage({ en: "year", es: "año" });
            return Math.floor(interval) + " " + lbl;
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            lbl = interval > 1 ? this.__selectLanguage({ en: "months", es: "meses" }) : this.__selectLanguage({ en: "month", es: "mes" });
            return Math.floor(interval) + " " + lbl;
        }
        interval = seconds / 86400;
        if (interval > 1) {
            lbl = interval > 1 ? this.__selectLanguage({ en: "days", es: "días" }) : this.__selectLanguage({ en: "day", es: "día" });
            return Math.floor(interval) + " " + lbl;
        }
        interval = seconds / 3600;
        if (interval > 1) {
            lbl = interval > 1 ? this.__selectLanguage({ en: "hours", es: "horas" }) : this.__selectLanguage({ en: "hour", es: "hora" });
            return Math.floor(interval) + " " + lbl;
        }
        interval = seconds / 60;
        if (interval > 1) {
            lbl = interval > 1 ? this.__selectLanguage({ en: "minutes", es: "minutos" }) : this.__selectLanguage({ en: "minute", es: "minuto" });
            return Math.floor(interval) + " " + lbl;
        }
        lbl = seconds > 1 ? this.__selectLanguage({ en: "seconds", es: "segundos" }) : this.__selectLanguage({ en: "second", es: "segundo" });
        return Math.floor(seconds) + " " + lbl;
    };
    SDate.prototype.isCurDate = function () {
        if (this.toString("yyyy-MM-dd") == new SDate().toString("yyyy-MM-dd")) {
            return true;
        }
        return false;
    };
    SDate.prototype.formatCero = function (val) {
        var txt = val + "";
        if (txt.length > 1) {
            return val;
        }
        return "0" + val;
    };
    SDate.prototype.formatTime12 = function (hours, minutes) {
        // Determina si es AM o PM
        var period = hours >= 12 ? 'PM' : 'AM';
        // Convierte las horas al formato de 12 horas
        hours = hours % 12;
        hours = hours ? hours : 12; // Si las horas son 0, se convierte a 12
        // Añade un cero al principio si los minutos son menores a 10
        var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        // Devuelve la hora formateada en h:mm a.m./p.m.
        return hours + ':' + formattedMinutes + ' ' + period;
    };
    SDate.prototype.toString = function (format) {
        if (!format) {
            format = "yyyy-MM-dd hh:mm:ss";
        }
        var json = this.toJson();
        format = format.replace("yyyy", json.year + "");
        format = format.replace("MM", this.formatCero(json.month));
        format = format.replace("MONTH", this.getMonthJson().text);
        format = format.replace("DAY", this.getDayOfWeekJson().text);
        format = format.replace("day", this.getDayOfWeekJson().textSmall);
        format = format.replace("MON", this.getMonthJson().textSmall);
        format = format.replace("dd", this.formatCero(json.day));
        format = format.replace("hh", this.formatCero(json.hour));
        format = format.replace("HH", this.formatTime12(json.hour, json.minutes));
        format = format.replace("mm", this.formatCero(json.minutes));
        format = format.replace("ss", this.formatCero(json.seconds));
        var timezoneOffset = this.date.getTimezoneOffset();
        var sign = timezoneOffset <= 0 ? "+" : "-";
        timezoneOffset = Math.abs(timezoneOffset);
        var hoursOffset = this.formatCero(Math.floor(timezoneOffset / 60));
        var minutesOffset = this.formatCero(timezoneOffset % 60);
        var tzdFormatted = "".concat(sign).concat(hoursOffset, ":").concat(minutesOffset);
        format = format.replace("TZD", tzdFormatted);
        return format;
    };
    SDate.prototype.get = function (param) {
        return this.toJson()[param];
    };
    SDate.prototype.toJson = function () {
        return {
            minutes: this.date.getMinutes(),
            hour: this.date.getHours(),
            day: this.date.getDate(),
            seconds: this.date.getSeconds(),
            dayOfWeek: this.date.getDay(),
            month: this.getMonth(),
            year: this.date.getFullYear()
        };
    };
    SDate.getMonthsOfYear = function (language) {
        if (language === void 0) { language = SLanguage.language; }
        if (language == "en") {
            return CalendarParamsEn.month;
        }
        return CalendarParams.month;
    };
    SDate.getMonth = function (month, language) {
        if (language === void 0) { language = SLanguage.language; }
        var dateJson = CalendarParams.month[month];
        if (language == "en") {
            dateJson = CalendarParamsEn.month[month];
        }
        return __assign(__assign({}, dateJson), { month: month });
    };
    SDate.getDaysOfWeek = function (language) {
        if (language === void 0) { language = SLanguage.language; }
        if (language == "en") {
            return CalendarParamsEn.dayOfWeek;
        }
        return CalendarParams.dayOfWeek;
    };
    SDate.getDayOfWeek = function (dia, language) {
        if (language === void 0) { language = SLanguage.language; }
        var dateJson = CalendarParams.dayOfWeek[dia];
        if (language == "en") {
            dateJson = CalendarParamsEn.dayOfWeek[dia];
        }
        return __assign(__assign({}, dateJson), { day: dia });
    };
    SDate.getDaysInMonth = function (year, month) {
        return new Date(year, month, 0).getDate();
    };
    SDate.isValid = function (fecha) {
        var fechaf = fecha.split("-");
        var ano = fechaf[0];
        var mes = fechaf[1];
        var dia = fechaf[2];
        var anoNum = parseInt(ano, 10);
        var mesNum = parseInt(mes, 10) - 1;
        var diaNum = parseInt(dia, 10);
        if ((anoNum < 1900) || (anoNum > 2100))
            return false;
        var fechaAno = new Date(anoNum, 1, 1); // Para tener el año a 4 dígitos
        var fechaDate = new Date(anoNum, mesNum, diaNum); // Paso a fmt fecha
        return (fechaAno.getFullYear() == fechaDate.getFullYear() &&
            mesNum == fechaDate.getMonth()) ? true : false;
    };
    return SDate;
}());
export default SDate;

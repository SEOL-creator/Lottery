export default function formatDateTime(date, format) {
    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일", "월", "화", "수", "목", "금", "토"];

    const zf = (len, str) => {
        if (typeof str === "number") str = str.toString();
        let result = "";
        for (let i = 0; i < len - str.length; i++) {
            result += "0";
        }
        return (result += str);
    };

    if (!format || !date) return "";

    return format.replace(/(YYYY|YY|MM|dd|aaaa|aaa|HH|hh|mm|ss|a\/p)/gi, function (formatstr) {
        switch (formatstr) {
            case "YYYY":
                return date.getFullYear();
            case "YY":
                return zf(2, date.getFullYear() % 1000);
            case "MM":
                return date.getMonth() + 1;
            case "dd":
                return zf(2, date.getDate());
            case "aaa":
                return weekName[date.getDay() + 7];
            case "aaaa":
                return weekName[date.getDay()];
            case "HH":
                return zf(2, date.getHours());
            case "hh":
                return zf(2, date.getHours() % 12 ? date.getHours() % 12 : 12);
            case "mm":
                return zf(2, date.getMinutes());
            case "ss":
                return zf(2, date.getSeconds());
            case "a/p":
                return date.getHours() < 12 ? "오전" : "오후";
            default:
                return formatstr;
        }
    });
}

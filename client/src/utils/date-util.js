import moment from 'moment';

export const customTranslator = (timestamp) => {
    var t = new Date(timestamp/1000);
    var t_cur = Date.now()/1000;
    if (moment.unix(t_cur).format("DD-MM-YY")  == moment.unix(t).format("DD-MM-YY")){
        return moment.unix(t).format('HH:MM A')+' Today' 
    } else if (moment.unix(t_cur).format("DD-MM-YY") == moment.unix(t).add(1, 'd').format("DD-MM-YY") ){
        return moment.unix(t).format('HH:MM A')+' Yesterday' 
    } else if (moment.unix(t).format('w-YYYY') == moment.unix(t_cur).format('w-YYYY')){
        return moment.unix(t).format('HH:MM A dddd')
    } else return moment.unix(t).format('HH:MM A - DD/MMM/YY')
}

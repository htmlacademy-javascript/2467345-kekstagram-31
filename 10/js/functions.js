//Функция для проверки длянны строки
function isStringFit(str, guessLength) {
  return str.length <= guessLength;
}

isStringFit('проверяемая строка', 20);
// console.log(isStringFit('проверяемая строка', 18));
// console.log(isStringFit('проверяемая строка', 10));

//Функция проверки строки на палиндром
function isPalindrome(str) {
  str = str.toLowerCase().replaceAll(' ', '');
  const mid = Math.floor(str.length / 2);
  for (let i = 0; i < mid; i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}

isPalindrome('топот');
// console.log(isPalindrome('ДовОд'));
// console.log(isPalindrome('Кекс'));
// console.log(isPalindrome('Лёша на полке клопа нашёл '));

//Функция которя возвращает все цифры из строки
function getAllNumbers(str) {
  str = `${str}`;
  let hasNumber = false;
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (
      parseInt(str[i], 10) > 0 &&
      parseInt(str[i], 10) <= 9 &&
      hasNumber === false
    ) {
      result += str[i];
      hasNumber = true;
    } else if (
      parseInt(str[i], 10) >= 0 &&
      parseInt(str[i], 10) <= 9 &&
      hasNumber === true
    ) {
      result += str[i];
    }
  }

  return parseInt(result, 10) || NaN;
}

getAllNumbers('2023 год');
// console.log(getAllNumbers('ECMAScript 2022'));
// console.log(getAllNumbers('1 кефир, 0.5 батона'));
// console.log(getAllNumbers('агент 007'));
// console.log(getAllNumbers('а я томат'));
// console.log(getAllNumbers(2023));
// console.log(getAllNumbers(-1));
// console.log(getAllNumbers(1.5));


function getTimeFromStr(time){
  const separateTime = time.split(':');
  const hours = parseInt(separateTime[0], 10);
  const minutes = parseInt(separateTime[1], 10);

  return hours * 60 + minutes;
}

function meetingInBusinessHours(startTime, endTime, startMeetingTime, duration){
  const endMeetingTime = getTimeFromStr(startMeetingTime) + duration;

  if(getTimeFromStr(startTime) <= getTimeFromStr(startMeetingTime) &&
  getTimeFromStr(endTime) >= endMeetingTime){
    return true;
  } else{
    return false;
  }

}
meetingInBusinessHours('08:00', '17:30', '14:00', 90);
// console.log(meetingInBusinessHours('08:00', '17:30', '14:00', 90));
// console.log(meetingInBusinessHours('8:0', '10:0', '8:0', 120));
// console.log(meetingInBusinessHours('08:00', '14:30', '14:00', 90));
// console.log(meetingInBusinessHours('14:00', '17:30', '08:0', 90));
// console.log(meetingInBusinessHours('8:00', '17:30', '08:00', 900));

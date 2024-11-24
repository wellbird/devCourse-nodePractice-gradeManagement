function checkUserInput(event) {
  const userInputKorean = document.getElementById('korean').value;
  const userInputEnglish = document.getElementById('english').value;
  const userInputMath = document.getElementById('math').value;

  if (
    userInputKorean < 0 ||
    userInputKorean > 100 ||
    userInputEnglish < 0 ||
    userInputEnglish > 100 ||
    userInputMath < 0 ||
    userInputMath > 100
  ) {
    alert('성적은 0점부터 100점 사이로 입력 가능합니다.');
    event.preventDefault();
    return false;
  }

  return true;
}

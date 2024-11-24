function throwPutMethod(event, id) {
  event.preventDefault();
  const userInputName = document.getElementById('name').value;
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
  } else {
    fetch(`/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userInputName,
        korean: userInputKorean,
        english: userInputEnglish,
        math: userInputMath,
      }),
    }).then((response) => {
      if (response.ok) {
        alert('수정되었습니다.');
        window.location.href = '/';
      } else {
        alert('수정에 실패했습니다.');
      }
    });
  }
}

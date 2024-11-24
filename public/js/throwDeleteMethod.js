function throwDeleteMethod(id) {
  fetch(`/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('삭제할 데이터가 존재하지 않습니다.');
      }
    })
    .then((data) => {
      console.log(data);
      alert(data.message);
      window.location.reload();
    })
    .catch((error) => {
      alert(error.message);
    });
}

function BasvuruOlustur() {
  return (
    <div>
      <form>
        <label htmlFor="name">name</label>
        <input type="text" id="name" />
        <label htmlFor="surname">surname</label>
        <input type="text" id="surname" />
        <label htmlFor="age">age</label>
        <input type="text" id="age" />
        <label htmlFor="tc">TC</label>
        <input type="text" id="tc" />
        <label htmlFor="desc">description</label>
        <input type="text" id="desc" />
        <label htmlFor="address">address</label>
        <input type="text" id="address" />
        <label htmlFor="photos">photos</label>
        <input type="file" id="photos" />
      </form>
    </div>
  );
}

export default BasvuruOlustur;

export default class UserInfo {
  constructor ({nameSelector, professionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      profession: this._profession.textContent
    }
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._profession.textContent = userInfo.profession;
  }
}
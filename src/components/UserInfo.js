export default class UserInfo {
  constructor ({nameSelector, professionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo() {
    const UserInfo = {
      name: this._name.textContent,
      profession: this._profession.textContent
    }
    return UserInfo;
  }

  setUserInfo(UserInfo) {
    this._name.textContent = UserInfo.name;
    this._profession.textContent = UserInfo.profession;
  }
}
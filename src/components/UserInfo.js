export default class UserInfo {
  constructor ({nameSelector, professionSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._profession.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._profession.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }

  setUserAvatar(userInfo) {
    this._avatar.src = userInfo.avatar;
  }

}
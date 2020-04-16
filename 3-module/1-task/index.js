/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  return users.map(function (user) {
        return user.name;
    });
}

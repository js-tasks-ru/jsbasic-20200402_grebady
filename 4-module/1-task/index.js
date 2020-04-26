/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
'use strict';
/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  for (let i = 0; i<friends.length; ++i){
    let li = document.createElement("li");
    let j = 0;
    for (let partOfNameOfFriend in friends[i]){
      li.innerHTML += friends[i][partOfNameOfFriend];
      if(j === 0) li.innerHTML += " ";
      j++;
    }
    ul.append(li);
  }
  return ul;
}

let friends = [
  {
    firstName: 'Artsiom',
    lastName: 'Mezin'
  },
  {
    firstName: 'Ilia',
    lastName: 'Kantor'
  },
  {
    firstName: 'Christopher',
    lastName: 'Michael'
  }
];
makeFriendsList(friends);

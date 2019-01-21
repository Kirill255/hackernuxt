import axios from "~/plugins/axios";

export const state = () => ({
  // users: [
  //   {
  //     id: 0,
  //     login: "john"
  //   }
  // ],
  // ids: [],
  items: []
});

export const mutations = {
  // setUsers(state, users) {
  //   state.users = users;
  // },
  // setIds(state, ids) {
  //   state.ids = ids;
  // },
  setItems(state, items) {
    state.items = items;
  }
};

export const actions = {
  // async nuxtServerInit({ commit }) {
  //   // const { data: users } = await axios.get("users");
  //   // commit("setUsers", users);

  //   // const { data: ids } = await axios.get("topstories.json");
  //   // commit("setIds", ids);

  //   // Заметка: почему-то если ставить 10 запросов, то с моего ip-адреса они зависали (NuxtServerError connect ETIMEDOUT 85.931.81.22:443)
  //   // Видимо слишком много почти одновременных обращений
  //   // Поэтому я сначала ставил меньше 2 или 5 const tenIds = ids.slice(0, 5);
  //   // А потом просто включил vpn, с vpn работало и 10 запросов

  //   try {
  //     const { data: ids } = await axios.get("topstories.json"); // возвращает масси id-шников статей
  //     const tenIds = ids.slice(0, 10); // берём 10
  //     const itemsPromises = tenIds.map(id => axios.get(`item/${id}.json`)); // делаем запросы на эти url-ы статей
  //     const itemsResponses = await Promise.all(itemsPromises); // дожидаемся пока все выполнятся
  //     const items = itemsResponses.map(res => res.data); // вынимаем из запросов только data
  //     commit("setItems", items);
  //   } catch (err) {
  //     console.log("Что-то не так: ", err);
  //   }
  // },

  // // мы можем делать запрос в nuxtServerInit или сделать свой экшен и диспатчить его через fetch из компомента
  // async LOAD_ITEMS({ commit }, dataURL) {
  //   try {
  //     const { data: ids } = await axios.get(dataURL); // возвращает масси id-шников статей
  //     const tenIds = ids.slice(0, 10); // берём 10
  //     const itemsPromises = tenIds.map(id => axios.get(`item/${id}.json`)); // делаем запросы на эти url-ы статей
  //     const itemsResponses = await Promise.all(itemsPromises); // дожидаемся пока все выполнятся
  //     const items = itemsResponses.map(res => res.data); // вынимаем из запросов только data
  //     commit("setItems", items);
  //   } catch (err) {
  //     console.log("Что-то не так: ", err);
  //   }
  // },

  // мы можем делать запрос в nuxtServerInit или сделать свой экшен и диспатчить его через fetch из компомента
  async LOAD_ITEMS({ commit }, dataURL) {
    try {
      const { data: ids } = await axios.get(dataURL); // возвращает масси id-шников статей
      const tenIds = ids.slice(0, 10); // берём 10
      const itemsPromises = tenIds.map(id => axios.get(`item/${id}.json`)); // делаем запросы на эти url-ы статей
      const itemsResponses = await Promise.all(itemsPromises); // дожидаемся пока все выполнятся
      const items = itemsResponses.map(res => res.data); // вынимаем из запросов только data

      // добавим проверку, т.к данных может и не быть, а в компоненте мы обращаемся к полям title и id, из-за чего может быть ошибка
      // тоесть какой-то или несколько запросов провалились, и соотвественно в массиве нет данных для этого запроса
      const realItems = items.map(item => item || { title: "Failed to load", id: 0 });

      commit("setItems", realItems);
    } catch (err) {
      console.log("Что-то не так: ", err);
    }
  }
};

/*
Что-то вроде такого
  * Story title
  * Story title
  * Failed to load
  * Story title
  * Story title
  * Failed to load
  * Story title
*/

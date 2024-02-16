export const ApiUrls = {
  members: {
    getAll: '/membres/all',
    login: '/membres/login',
    inscription: '/membres/inscription',
    getOne: (id: string) => `/membres/${id}`
  },
  groups: {
    getOne: (id: string) => `/groupes/${id}`
  }
}

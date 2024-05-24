import { BlogQueryParams } from '../../src/feature/blogs/api/types/models';

/*обязательно этот обьект должен содержать в себе
те же методы что и содержит  BlogQueryRepository -ибо
его я и парадирую */
export const blogQueryRepositoryMock = {
  getBlogs(queryParamsBlog: BlogQueryParams) {
    /*    обязательно отправить отсюда ПРОМИС- ибо далее в данной 
        цепочке кода 
        именно промис с результатом ожидается */
    return Promise.resolve({ ha: 55 });
  },
  getBlogById(bologId: string) {
    return Promise.resolve(55);
  },
};

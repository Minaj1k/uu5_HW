import { shallow } from "enzyme";
import UuTodoList from "uu_todolist_maing01-hi";

describe(`UuTodoList.Routes.List`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuTodoList.Routes.List />);
    expect(wrapper).toMatchSnapshot();
  });
});

import { shallow } from "enzyme";
import UuTodoList from "uu_todolist_maing01-hi";

describe(`UuTodoList.Routes.Lists`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuTodoList.Routes.Lists />);
    expect(wrapper).toMatchSnapshot();
  });
});

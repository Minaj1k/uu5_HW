import { shallow } from "enzyme";
import UuTodoList from "uu_todolist_maing01-hi";

describe(`UuTodoList.Routes.Item`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuTodoList.Routes.Item />);
    expect(wrapper).toMatchSnapshot();
  });
});

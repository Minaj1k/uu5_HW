import { shallow } from "enzyme";
import UuTodoList from "uu_todolist_maing01-hi";

describe(`UuTodoList.Main.List`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuTodoList.Main.List />);
    expect(wrapper).toMatchSnapshot();
  });
});

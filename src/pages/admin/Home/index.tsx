import styles from "./Home.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Home = () => {
  return <div className={cx("home")}></div>;
};

export default Home;

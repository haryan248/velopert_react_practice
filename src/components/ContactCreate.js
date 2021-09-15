import React from "react";
import PropTypes from "prop-types";

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
        };
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };

    handleClick = () => {
        const contact = {
            name: this.state.name,
            phone: this.state.phone,
        };
        this.props.onCreate(contact);
        // 추가후 초기화
        this.setState({
            name: "",
            phone: "",
        });
        this.nameInput.focus();
    };
    // 엔터키로 입력 이벤트 추가
    handelKeyPress = (e) => {
        // enter 치면 클릭 이벤트
        if (e.charCode === 13) {
            this.handleClick();
        }
    };
    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input
                        ref={(ref) => {
                            this.nameInput = ref;
                        }}
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    ></input>
                    <input type="text" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange} onKeyPress={this.handelKeyPress}></input>
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        );
    }
}

ContactCreate.propTypes = {
    onCreate: PropTypes.func,
};
ContactCreate.defaultProps = {
    onCreate: () => {
        console.error("onCreate not defined");
    },
};

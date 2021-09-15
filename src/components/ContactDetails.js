import React from "react";
import PropTypes from "prop-types";

export default class ContactDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            name: "",
            phone: "",
        };
    }

    static defaultProps = {
        contact: {
            name: "",
            phone: "",
        },
        onRemove: () => {
            console.error("onRemove not defined");
        },
        onEdit: () => {
            console.error("onEdit not defined");
        },
    };

    // edit toggle 함수
    handleToggle = () => {
        if (!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone,
            });
        } else {
            this.handleEdit();
        }
        this.setState({
            isEdit: !this.state.isEdit,
        });
    };
    // 이름과 번호를 입력할때 마다 작동
    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };
    // 수정시 props 함수 실행
    handleEdit = () => {
        this.props.onEdit(this.state.name, this.state.phone);
    };
    // 엔터키로 입력 이벤트 추가
    handelKeyPress = (e) => {
        // enter 치면 클릭 이벤트
        if (e.charCode === 13) {
            this.handleToggle();
        }
    };
    render() {
        // 선택되었을 때 보여질 부분
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const edit = (
            <div>
                <p>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}></input>
                </p>

                <p>
                    <input type="text" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange} onKeyPress={this.handelKeyPress}></input>
                </p>
            </div>
        );
        const view = this.state.isEdit ? edit : details;

        // 아무것도 선택되지 않았을 때 보여질 부분
        const blank = <div> Nothing is Selected </div>;
        return (
            <div>
                <h2>Details</h2>

                {/* isSelected props 값에 따라 어떤걸 보여줄지 정한다
                    ternary expression condition ? true : false */}

                {this.props.isSelected ? view : blank}
                <p>
                    <button onClick={this.handleToggle} onChange={this.handleChange}>
                        {this.state.isEdit ? "OK" : "Edit"}
                    </button>
                    <button onClick={this.props.onRemove}>remove</button>
                </p>
            </div>
        );
    }
}
ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
};

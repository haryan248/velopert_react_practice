import React from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";
import ContactCreate from "./ContactCreate";

import update from "react-addons-update";

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: "",
            contactData: [
                {
                    name: "Abet",
                    phone: "010-0000-0001",
                },
                {
                    name: "Betty",
                    phone: "010-0000-0002",
                },
                {
                    name: "Charlie",
                    phone: "010-0000-0003",
                },
                {
                    name: "David",
                    phone: "010-0000-0004",
                },
            ],
        };
    }
    componentDidMount() {
        const contactData = localStorage.contactData;

        if (contactData) {
            this.setState({
                contactData: JSON.parse(contactData),
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }
    // 전화번호부 선택한 index 가 변화하면 작동
    handleChange = (e) => {
        this.setState({
            keyword: e.target.value,
        });
    };
    // 전화번호부 선택 핸들링
    handleClick = (key) => {
        this.setState({
            selectedKey: key,
        });
    };
    // 전화번호부 추가
    handleCreate = (contact) => {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] }),
        });
    };
    // 전화번호부 제거
    handleRemove = () => {
        // 선택한게 없으면 제거하지 않기
        if (this.state.selectedKey < 0) {
            return;
        }
        this.setState({
            contactData: update(this.state.contactData, {
                $splice: [[this.state.selectedKey, 1]],
            }),
            // 선택한 전화번호부 초기화
            selectedKey: -1,
        });
    };
    // 전화번호부 수정
    handleEdit = (name, phone) => {
        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.selectedKey]: {
                    name: { $set: name },
                    phone: { $set: phone },
                },
            }),
        });
    };

    render() {
        // 검색한 번호부 선택
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter((contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
            });
            return data.map((contact, i) => {
                return <ContactInfo contact={contact} key={i} onClick={() => this.handleClick(i)} />;
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input name="keyword" placeholder="Search" value={this.state.keyword} onChange={this.handleChange} />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails isSelected={this.state.selectedKey !== -1} contact={this.state.contactData[this.state.selectedKey]} onRemove={this.handleRemove} onEdit={this.handleEdit}></ContactDetails>
                <ContactCreate onCreate={this.handleCreate} />
            </div>
        );
    }
}

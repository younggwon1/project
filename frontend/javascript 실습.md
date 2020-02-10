# javascript 실습

> 암호화화폐의 시세를 가져와서, 검색기능을 추가하라.

```js
# App.js

import React, { Component } from 'react';
import PhoneForm from './components/phone_form';
import PhoneList from './components/phone_list';

class App extends Component {
  id = 1;
  state = {
    contacts: [
      {
        id: 0,
        name: '리액트 소개'
      }
    ],
    keyword: ''
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    });
  }

  handleCreate = (data) => {
    //console.log(data);
    //data -> contact 배열에 추가

    const { contacts } = this.state; //비구조 할당

    //console.log(this.state);
    //console.log(this.state.contacts);
    //console.log(contacts);

    this.setState({
      contacts: contacts.concat({ id: this.id++, ...data })
    })
  }

  handleRemove = (selected_id) => {
    // state의 contacts에서 해당 ID값을 삭제
    const { contacts } = this.state;

    this.setState({
      contacts: contacts.filter(
        info => info.id !== selected_id
      )
    });
  }

  // handleUpdate = (selected_id, data) => {
  //   const { contacts } = this.state;
  //   //this.state
  //   //console.log('selected_id =' + selected_id)
  //   this.setState({
  //     contacts: contacts.map(
  //       item => item.id === selected_id
  //         ? { ...item, ...data } // 데이터 수정
  //         : item //기존데이터 유지

  //     )
  //   });
  // }

  render() {
    const { contacts, keyword } = this.state;
    // 전체 목록 => contacts
    // 검색할 키워드 => keyword
    // contacts에서 keyword인 데이터만 검색해서 전달(List)
    // contacts.map or contacts.filter를 이용 -> 이 부분에서는 contacts.filter를 이용
    const filteredContacts = contacts.filter(v => v.name.indexOf(keyword) !== -1);

    return (
      <div className="App-header">
        <PhoneForm
          onCreate={this.handleCreate} />


        <PhoneList
          data={filteredContacts}
          onRemove={this.handleRemove}
           />
      </div>
    );
  }
}

export default App;

```



```js
# phone_form

import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: ''

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      name: '',

    })
  }

  render() {
    return(
      
      <form onSubmit={this.handleSubmit}>
        <h1>오늘 할 일</h1>
        <input 
          value={this.state.name}
          name="name"
          onChange={this.handleChange} />
        <button type="submit">추가</button>
      </form>
    );
  } 
}

export default PhoneForm;
```



```js
# phone_list

import React, { Component } from 'react';
import PhoneItem from './phone_item';


class PhoneList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data; 
      }

    render() {
        const { data, onRemove } = this.props; //data -> contacts
        //const data = this.props; //contacts -> data.contacts

        const list = data.map(value => (  //for문장과 동일
            <PhoneItem 
            key={value.id} // key값을 설정
            info={value}
            onRemove={onRemove}
            />
            ) 
        );
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneList;
```



```js
# phone_item

import React, { Component } from 'react';


class PhoneItem extends Component {

    state = {
        editable: false,
        name: '',

    }

    componentDidUpdate(preProps, prevState) {
        const { info, onUpdate } = this.props;
        console.log(info.name + "/" + info.phone);
        console.log(onUpdate);
        console.log(prevState.editable + "/" + this.state.editable);

        if (!prevState.editable && this.state.editable) {
            this.setState({
                name: info.name,

            })
        }

        // update
        if (prevState.editable && !this.state.editable) {
            onUpdate(info.id, { name: this.state.name});
        }
    }

    handleRemove = (e) => {
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    // handleUpdate = (e) => {
    //     const { editable } = this.state;
    //     this.setState({
    //         editable: !editable
    //     });
    // }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const css = {
            border: '1px solid black',
            padding: '8px',
            margin: '5px'
        };

        const { editable } = this.state;
        // if (editable) {
        //     console.log('수정모드');
        //     return (
        //         <div style={css}>
        //             <div>
        //                 <input value={this.state.name}
        //                     name="name"
        //                     placeholder="오늘 할 일을 입력하세요"
        //                     onChange={this.handleChange} />
        //             </div>
        //             <button onClick={this.handleRemove}>삭제</button>
        //             <button onClick={this.handleUpdate}>적용</button>
        //         </div>
        //     );
        // }
        // else {
            //console.log('일반모드');
        // }

        //const info = this.props.info;
        //console.log(info.id);
        //console.log(info.name);
        //console.log(info.phone);

        const { name, id } = this.props.info; //위의 방식과 동일한 방식 -> 동일한 결과
        //console.log(id);
        //console.log(name);
        //console.log(phone);

        return (
            <div style={css}>
                <div><b>{name}</b></div>
                
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneItem;
```


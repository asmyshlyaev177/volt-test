import React from 'react';
import PropTypes from 'prop-types';
import {Button, PageHeader} from 'react-bootstrap';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.api = props.api;
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editItem = this.editItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.setField = this.setField.bind(this);
    this.send = this.send.bind(this);
    this.closeConfirmModal = this.closeConfirmModal.bind(this);
    this.confirm = this.confirm.bind(this);

    this.mode = 'create';

    this.state = {
      data: [],
      showModal: false,
      confirmModal: false,
      newEntry: {
        // Fields for all childrens:
        // customer_id, discount, total, name, address, phone, price, id
      },
    };
  }

  componentWillMount() {
    this.get();
  }

  setField = (field, val) => {
    const {newEntry} = this.state;
    this.setState({newEntry: {...newEntry, [field]: val}});
  };

  closeModal() {
    this.setState({showModal: false});
  }

  clearData() {
    const {newEntry: entry} = this.state;
    const newEntry = {...entry};
    Object.keys(newEntry).forEach(k => {
      newEntry[k] = null;
    });
    this.setState({newEntry});
  }

  showModal(id) {
    this.setState({showModal: true});
  }

  send = () => {
    const {
      newEntry,
      newEntry: {id},
    } = this.state;

    const fn =
      this.mode === 'edit'
        ? () => this.api.edit(id, newEntry)
        : () => this.api.create(newEntry);

    fn().then(() => {
      this.clearData();
      this.closeModal();
      this.get();
    });
  };

  get = () => {
    this.api.get().then(res => {
      this.setState({data: res.data});
    });
  };

  confirm = id => {
    const {newEntry} = this.state;
    this.setState({confirmModal: true, newEntry: {...newEntry, id}});
  };

  closeConfirmModal = () => {
    this.setState({confirmModal: false});
  };

  removeItem = () => {
    const {
      newEntry: {id},
    } = this.state;
    this.clearData();
    this.closeConfirmModal();
    this.api.delete(id).then(() => {
      this.clearData();
      this.get();
    });
  };

  createItem = () => {
    this.mode = 'create';
    this.clearData();
    this.showModal();
  };

  editItem = (id = 0) => {
    const {data} = this.state;
    const elem = data.find(el => el.id === id);
    this.mode = 'edit';
    this.clearData();

    this.setState({newEntry: {...elem}}, () => this.showModal());
  };

  render() {
    const {
      data,
      newEntry,
      showModal: status,
      confirmModal: statusModal,
    } = this.state;
    const {
      editItem,
      confirm,
      confirmModal,
      createItem,
      closeConfirmModal,
      removeItem,
      send,
      setField,
      showModal,
      closeModal,
    } = this;
    const {render, title} = this.props;
    const propsRender = {
      status,
      send,
      statusModal,
      newEntry,
      confirm,
      data,
      editItem,
      createItem,
      removeItem,
      showModal,
      closeModal,
      closeConfirmModal,
      setField,
    };

    return (
      <div>
        <PageHeader>
          {title}
          <small>
            <Button onClick={createItem} style={{marginLeft: '20px'}}>
              Create
            </Button>
          </small>
        </PageHeader>

        {render(propsRender)}
      </div>
    );
  }
}

export {Wrapper};

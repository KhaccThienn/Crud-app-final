import React from "react";
import clsx from "clsx";
import Swal from "sweetalert2";
import style from "./Main.module.css";

class Mains extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ name: "data", status: false }],
            item: "",
            check: -1,
        };
    }
    getValue(e){
        this.setState({ item: e.target.value})
    }

    addItem(e){
        let list = this.state.data;
        list.push({name:this.state.item , status: false })
        this.setState({
            data: list
        })

        if (this.state.item === '') {
            Swal.fire({
                title: "Error!",
                text: "Alert error roi nhung van addItem, la lam vcl",
                icon: "error",
                confirmButtonText: 'OK',
                confirmButtonColor: 'red'
            });
        } else {
            Swal.fire({
                title: "Success!",
                text: "Add a new successfully",
                icon: "success",
                confirmButtonText: "Cool",
                confirmButtonColor: "lightgreen",
            });
        }
    } 

    upDate(e, key){
        this.setState({
            check:key,
            item: e.target.value
        })
    } 

    updateName(e){
        let list = this.state.data
        list.find((item, index) => {
            return index === this.state.check
        }).name = this.state.item;
        this.setState({
            data: list,
            check:-1
        })
    }

    delete(e,index){
        let list = this.state.data;

        list.splice(index, 1)
        
        this.setState({
            data: list
        })
    }

    Change(e, index) {
        let list = this.state.data;
        list[index].status = !list[index].status;
        this.setState({
            data: list,
        })
    }

    render() { 
        return ( 
            <div className={clsx(style.cardContainer)}>
                <div>
                    
                </div>
                <div className={clsx(style.formControl)}>
                    <input onChange={(e) => this.getValue(e)} type="text"/>
                    <button
                        onClick={(e) => this.addItem(e)}
                    >Add</button>
                </div>

                <table border='1' cellspacing='0' cellpadding='10' className={clsx(style.table)}>
                    <thead>
                        <tr>
                            <td>STT</td>
                            <td>Ten</td>
                            <td>Trang thai</td>
                            <td>Chuyen Trang Thai</td>
                            <td>Update</td>
                            <td>Delete</td>
                        </tr>
                        
                    </thead>
                    {
                        this.state.data.map((item,index)=> {
                            return(
                                <tbody key={index}>
                                    <tr>
                                        <td>{index +1}</td>
                                        {(this.state.check === index) ?
                                            <td>
                                                <input defaultValue={item.name} onChange={(e) => this.getValue(e)} onBlur={(e) => this.updateName(e)} type="text" />
                                            </td>
                                            :
                                            <td >{item.name}</td>
                                        }
                                        <td>{(item.status) ? "Da Hoan Thanh" : "Chua Hoan Thanh"}</td>
                                        <td><button onClick={(e) => this.Change(e, index)}>Change Status</button></td>
                                        <td><button onClick={(e) => this.upDate(e,index)} >Update</button></td>
                                        <td><button onClick={(e) => this.delete(e,index)} >X</button></td>
                                    </tr>
                                </tbody>
                            )
                            
                            
                        })
                    }
                </table>
            </div>
        );
    }
}

export default Mains;
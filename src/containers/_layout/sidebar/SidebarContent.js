import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends PureComponent
{
    hideSidebar = () => {
        this.props.onClick();
    };

    render() {
        return (
            <div className='sidebar__content'>
                <ul className='sidebar__block'>
                    <SidebarLink title='Log In' icon='exit' route='/login' onClick={this.hideSidebar}/>
                </ul>
                <ul className='sidebar__block'>
                    <SidebarLink title='Google map' icon='map' route='/google_map' onClick={this.hideSidebar}/>
                    <SidebarLink title='Google map New' icon='map' route='/google_map_new' onClick={this.hideSidebar}/>
                    <SidebarLink title='Data Table' icon='list' route='/data_table' onClick={this.hideSidebar}/>
                    <SidebarLink title='Chat Demo' icon='bubble' route='/chat' onClick={this.hideSidebar}/>
                    <SidebarLink title='FileUpload' icon='file-add' route='/file_upload' onClick={this.hideSidebar}/>
                    <SidebarLink title='ProFile' icon='file-add' route='/profile' onClick={this.hideSidebar}/>
                    <SidebarLink title='Land Management' icon='map' route='/land_management' onClick={this.hideSidebar}/>
                    <SidebarLink title='Modal' icon='map' route='/modal' onClick={this.hideSidebar}/>
                    <SidebarLink title='Summary' icon='map' route='/summary' onClick={this.hideSidebar}/>
                    <SidebarLink title='Time Line' icon='map' route='/timeline' onClick={this.hideSidebar}/>
                    <SidebarCategory title='Forms' icon='file-add'>
                        <SidebarLink title='Basic Form' route='/forms/basic_form' onClick={this.hideSidebar}/>
                        <SidebarLink title='Check Form Controls' route='/forms/check_form_controls' onClick={this.hideSidebar}/>
                        <SidebarLink title='File Upload' route='/forms/file_upload' onClick={this.hideSidebar}/>
                        <SidebarLink title='Floating Labels Form' route='/forms/floating_labels_form' onClick={this.hideSidebar}/>
                        <SidebarLink title='Form Dropzone' route='/forms/form_dropzone' onClick={this.hideSidebar}/>
                        <SidebarLink title='Form Layouts' route='/forms/form_layouts' onClick={this.hideSidebar}/>
                        <SidebarLink title='Form Picker' route='/forms/form_picker' onClick={this.hideSidebar}/>
                        <SidebarLink title='Form Validation' route='/forms/form_validation' onClick={this.hideSidebar}/>
                        <SidebarLink title='Mask Form' route='/forms/mask_form' onClick={this.hideSidebar}/>
                        <SidebarLink title='Material Form' route='/forms/material_form' onClick={this.hideSidebar}/>
                        <SidebarLink title='Wizard Form' route='/forms/wizard_form' onClick={this.hideSidebar}/>
                    </SidebarCategory>
                </ul>
            </div>
        )
    }
}

export default connect()(SidebarContent);
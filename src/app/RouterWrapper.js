import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../containers/_layout';
import Verify from '../containers/user/verify'
import LogIn from '../containers/user/login';
import Register from '../containers/user/register';
import GoogleMap from '../containers/google_map';
import GoogleMapNew from '../containers/google_map_new';
import Table from '../containers/data_table';
import Chat from '../containers/chat';
import FileUpload from '../containers/file_upload';
import ProFile from '../containers/user/profile';
import LandManagement from '../containers/land_management';
import Modal from '../containers/modals';
import ProjectSummary from '../containers/project-summary';
import TimeLine from '../containers/timeline';
import ToolTips from '../containers/tooltips';
import MapMenu from '../containers/mapmenu';

import BasicForm from '../containers/form/basic_form';
import FormDropzone from '../containers/form/form_dropzone';
import FileUploadForm from '../containers/form/file_upload';
import FormLayouts from '../containers/form/form_layouts';
import CheckFormControls from '../containers/form/check_form_controls';
import FormValidation from '../containers/form/form_validation';
import MaskForm from '../containers/form/mask_form';
import WizardForm from '../containers/form/wizard_form';
import MaterialForm from '../containers/form/material_form';
import FloatingLabelsForm from '../containers/form/floating_labels_form';
import FormPicker from '../containers/form/form_picker';

import { PrivateRoute } from '../containers/PrivateRoute';

const Router = () => (
    <main>
        <Switch>
            <PrivateRoute path='/google_map' component={wrappedRoutes} />
            <PrivateRoute path='/google_map_new' component={wrappedRoutes} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/register' component={Register} />
            <Route path='/map_menu/:name' component={MapMenu} />
            <Route exact path='/verify' component={Verify} />
            <Route path='/forms' component={wrappedRoutes}/>
            <Route exact path='/chat' component={wrappedRoutes} />
            <Route path='/file_upload' component={wrappedRoutes} />
            <Route exact path='/data_table' component={wrappedRoutes} />
            <Route exact path='/profile' component={wrappedRoutes} />
            <Route exact path='/land_management' component={wrappedRoutes} />
            <Route exact path='/modal' component={wrappedRoutes} />
            <Route exact path='/summary' component={wrappedRoutes} />
            <Route exact path='/timeLine' component={wrappedRoutes} />
            <Route exact path='/' component={() => <Redirect to="/google_map" />} />
        </Switch>
    </main>
);

const wrappedRoutes = () => (
    <div>
        <Layout />
        <div className='container__wrap'>
            <Route path='/google_map' component={GoogleMap} />
            <Route path='/google_map_new' component={GoogleMapNew} />
            <Route path='/file_upload' component={FileUpload} />
            <Route path='/data_table' component={Table} />
            <Route path='/profile' component={ProFile} />
            <Route path='/land_management' component={LandManagement} />
            <Route path='/forms' component={Forms} />
            <Route path='/chat' component={Chat} />
            <Route path='/tooltips' component={ToolTips} />
            <Route path='/modal' component={Modal} />
            <Route path='/summary' component={ProjectSummary} />
            <Route path='/timeline' component={TimeLine} />
        </div>
    </div>
);

const Forms = () => (
    <Switch>
        <Route path='/forms/basic_form' component={BasicForm}/>
        <Route path='/forms/check_form_controls' component={CheckFormControls}/>
        <Route path='/forms/file_upload' component={FileUploadForm}/>
        <Route path='/forms/floating_labels_form' component={FloatingLabelsForm}/>
        <Route path='/forms/form_dropzone' component={FormDropzone}/>
        <Route path='/forms/form_layouts' component={FormLayouts}/>
        <Route path='/forms/form_picker' component={FormPicker}/>
        <Route path='/forms/form_validation' component={FormValidation}/>
        <Route path='/forms/mask_form' component={MaskForm}/>
        <Route path='/forms/material_form' component={MaterialForm}/>
        <Route path='/forms/wizard_form' component={WizardForm}/>
    </Switch>
);

export default Router;
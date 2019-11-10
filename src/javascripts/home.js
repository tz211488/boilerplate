// Load jQuery from NPM
import $ from 'jquery';
import '../stylesheets/home.scss';
import header from '../components/header/index';

window.$ = $;
window.jQuery = $;

require('./materialize');

header($);

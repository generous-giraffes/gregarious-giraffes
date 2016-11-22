//This file holds all of the actions types linking back to the actions and connecting to the reducer

//auth action
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

//chat action
export const SAVE_CHAT = 'SAVE_CHAT';
export const CHATS_RECEIVED = 'CHATS_RECEIVED';

//eventForm
export const SUBMIT_EVENT_FORM = 'SUBMIT_EVENT_FORM';
export const GET_EVENT_FORM = 'GET_EVENT_FORM';
export const ATTEND_EVENT = 'ATTEND_EVENT';
export const SHOW_EVENT = 'SHOW_EVENT';
export const SEARCH_EVENTS_BY_USER = 'SEARCH_EVENTS_BY_USER';
export const SEARCH_EVENTS_BY_EVENT_NAME = 'SEARCH_EVENTS_BY_EVENT_NAME';

//feed
export const GET_DASH_IMAGES = 'GET_DASH_IMAGES';
export const COMMENT_ON_DASH_IMAGE = 'COMMENT_ON_DASH_IMAGE';
export const GET_RECENT_USERS = 'GET_RECENT_USERS';
export const GET_BDAYS = 'GET_BDAYS';

//form
export const SUBMIT_FORM = 'SUBMIT_FORM';

//friends
export const GET_FRIENDS = 'GET_FRIENDS';
export const ADD_FRIEND = 'ADD_FRIEND';
export const SET_CURRENT_FRIEND = 'SET_CURRENT_FRIEND';
export const GET_FRIEND_IMAGES = 'GET_FRIEND_IMAGES';
export const GET_FRIEND_EVENTS = 'GET_FRIEND_EVENTS';
export const GET_FRIEND_FRIENDS = 'GET_FRIEND_FRIENDS';

//getPets
export const GET_PET = 'GET_PET';
export const GET_PET_NEWS = 'GET_PET_NEWS';

//image action
export const SUBMIT_PROFILE_IMAGE = 'SUBMIT_PROFILE_IMAGE';
export const GET_PROFILE_IMAGE = 'GET_PROFILE_IMAGE';
export const POST_USER_IMAGE = 'POST_USER_IMAGE';
export const GET_USER_IMAGES = 'GET_USER_IMAGES';

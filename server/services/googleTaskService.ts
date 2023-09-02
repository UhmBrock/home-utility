import express from 'express';
import { google } from 'googleapis';

export default class GoogleTaskService {
  
  private static instance: GoogleTaskService;
  
  private constructor() {
    // private constructor
  }
  
  static getInstance() {
    if (!GoogleTaskService.instance) {
      GoogleTaskService.instance = new GoogleTaskService();
    }
    return GoogleTaskService.instance;
  }

  async getTaskLists() {
    try {
      const taskList = await google.tasks("v1").tasklists.list();
      return taskList.data.items;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async getTasks(taskListId: string) {
    try {
      const taskList = await google.tasks("v1").tasks.list({
        tasklist: taskListId,
      });
      return taskList.data.items;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
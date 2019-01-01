import { getDB } from '../../db';
import { ObjectId, ObjectID } from 'mongodb';

export const BaseServices = collectionName => {
  return {
    // GET ALL ELEMENTS WITH A SEARCH CONDITIONS
    getAll(queryFind = {}, sortBy = {}) {
      delete queryFind.version;
      return new Promise((resolve, reject) => {
        getDB()
          .collection(collectionName)
          .find({ $and: [{ isActive: { $nin: [false] } }, queryFind]})
          .sort(sortBy)
          .toArray((err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
      });
    },

    // GET ELEMENT WITH A SEARCH CONDITIONS
    getOne(queryFind = {}) {
      delete queryFind.version;
      console.log(queryFind);
      return new Promise((resolve, reject) => {
        getDB()
          .collection(collectionName)
          .findOne(
            { $and: [{ isActive: { $nin: [false] } }, queryFind] },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
      });
    },

    // GET ELEMENT BY ID
    getById(id) {
      return new Promise((resolve, reject) => {
        getDB()
          .collection(collectionName)
          .findOne(
            { _id: new ObjectId(id), isActive: { $nin: [false] } },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
      });
    },

    // GET ELEMENTS BY IDS
    getByIds(ids) {
      return new Promise((resolve, reject) => {
        getDB()
          .collection(collectionName)
          .find({
            _id: { $in: ids.map(id => new ObjectId(id)) },
            isActive: { $nin: [false] }
          })
          .toArray((err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
      });
    },

    //CREATE
    create(entity) {
      entity['_id'] = new ObjectId();
      // console.log('eee',entity);
      return new Promise((resolve, reject) => {
        getDB()
          .collection(collectionName)
          .insertOne(entity, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.ops[0]); // return created entity
            }
          });
      });
    },

    // UPDATE ENTITY
    update(id, entity) {
      return new Promise((resolve, reject) => {
        getDB()
          .collection(collectionName)
          .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: entity },
            { returnOriginal: false },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result.value); // return updated entity
              }
            }
          );
      });
    },

    // DELETE AN ENTITY (Set isActive = false)
    delete(id) {
      return new Promise((resolve, reject) => {
        getDB()
          .collection(collectionName)
          .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { isActive: false } },
            { returnOriginal: false },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve({ _id: result.value._id });
              }
            }
          );
      });
    }

    // DELETE PERMANENTLY
    // delete(id) {
    //     return new Promise((resolve, reject) => {
    //         getDB().collection(collectionName).findOneAndDelete({ '_id': new ObjectId(id) }, (err) => {
    //             if (err) reject(err)
    //             else resolve()
    //         });
    //     })
    // }
  };
};

### MindX54Project
## NHÓM QUANG VINH, MINH ĐỨC, VIẾT HOÀNG
Dự án làm trang web quản lý công việc (tương tự trello)

Chức năng
- Trang Home với 3 loại task
- Quản lý thứ tự và trạng thái công việc
- Crud danh sách và thẻ , thêm thông tin tag, set deadline, thông tin nhắc
- Comment task
- Có kéo thả"

## USER STORY
- Là người dùng, tôi muốn đăng ký/đăng nhập bằng email và password
- Là người dùng, tôi muốn thêm/sửa/xoá các task(tạo deadline và chia task cho các member trong team,….)
- Là người dùng, tôi muốn xem mô tả chi tiết khi click vào các task
- Là người dùng, tôi muốn tạo các column trạng thái(to do/in progress/need adjusting/review/done/….) và kéo thả các task qua các cột trạng thái để nắm rõ tiến độ công việc
- Là người dùng, tôi muốn xem task nào đã quá deadline (quá deadline sẽ báo đỏ).
## Thiết kế cơ sở dữ liệu
Thư mục modules gồm có auth, board, card, list và activiti.
<img width="1021" alt="trello-clone-erd" src="https://user-images.githubusercontent.com/81417700/142159336-136287c9-b4bb-4067-85c7-3165967527ec.png">
## Data Schema 
- User
{
 username: {
      type: String,
      unique: true
    },
    displayName: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  }, {
    timestamps: true
  };


- Board 
{
 name: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    memberIds: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }],
  }, {
    timestamps: true
  };

- List
 {
  name: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards'
    },
  }, {
    timestamps: true
  };

- Card
{
  title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: 'lists'
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards'
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }],
  }, {
    timestamps: true
  };

- Activiti
{
  text: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards'
    },
  }, {
    timestamps: true
  };


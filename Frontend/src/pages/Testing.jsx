import { Tree, TreeNode } from 'react-organizational-chart';

const CustomNode = ({ name, role, id, img }) => (
  <div className="flex flex-col items-center border border-blue-400 rounded-md shadow-md px-4 py-2 bg-white">
    <img
      src={img}
      alt="profile"
      className="w-12 h-12 rounded-full mb-2 border"
    />
    <div className="text-sm font-semibold text-blue-700 text-center">{name}</div>
    <div className="text-xs text-yellow-500 text-center">{role}</div>
    <div className="text-xs text-gray-500 text-center">{id}</div>
  </div>
);

const Testing = () => (
  <div className="p-10 overflow-x-auto">
    <Tree
      label={
        <CustomNode
          name="MUHAMMAD IRSHAD"
          role="Foreman"
          id="143682"
          img="https://img.icons8.com/color/96/user-male-circle--v1.png"
        />
      }
    >
      <TreeNode
        label={
          <CustomNode
            name="MUHAMMAD ANS"
            role="Assistant Foreman"
            id="143659"
            img="https://img.icons8.com/color/96/user.png"
          />
        }
      >
        <TreeNode
          label={
            <CustomNode
              name="NAZIM MEHMOOD"
              role="Fitter"
              id="143567"
              img="https://img.icons8.com/color/96/user.png"
            />
          }
        />
        <TreeNode
          label={
            <CustomNode
              name="MUHAMMAD TAHIR"
              role="Fitter"
              id="143686"
              img="https://img.icons8.com/color/96/user.png"
            />
          }
        />
      </TreeNode>

      <TreeNode
        label={
          <CustomNode
            name="TAHIR FAROOQ"
            role="Assistant Fitter"
            id="143619"
            img="https://img.icons8.com/color/96/user.png"
          />
        }
      />

      <TreeNode
        label={
          <CustomNode
            name="MUHAMMAD NASIR"
            role="Cane Carrier"
            id="143622"
            img="https://img.icons8.com/color/96/user.png"
          />
        }
      >
        <TreeNode
          label={
            <CustomNode
              name="MUHAMMAD TAHIR"
              role="Fitter"
              id="143687"
              img="https://img.icons8.com/color/96/user.png"
            />
          }
        />
        <TreeNode
          label={
            <CustomNode
              name="MUHAMMAD TAHIR"
              role="Fitter"
              id="143688"
              img="https://img.icons8.com/color/96/user.png"
            />
          }
        />
      </TreeNode>
    </Tree>
  </div>
);

export default Testing;

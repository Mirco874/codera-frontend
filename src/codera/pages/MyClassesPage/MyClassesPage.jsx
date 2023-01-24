import { useFetch, useModal } from "../../../hooks";
import { Button, InfoMessage } from "../../../ui/components";
import { ClassCard, CreateClassModal, JoinClassModal } from "../../components";
import "./MyClassesPage.css";

export const MyClassesPage = () => {
  const { data, isLoading,fetchData} = useFetch("classes");

  const { open:isJoinModalOpen, 
          onOpenModal:openJoinModal, 
          onCloseModal:closeJoinModal } = useModal();

  const { open:isCreateModalOpen,
          onOpenModal:openCreateModal, 
          onCloseModal:closeCreateModal } = useModal();

  return (
    <div className="main-content">
      <section className="main-layout">
        <h2 className="h6">My classes</h2>
        {isLoading ? <p> loading</p>:
        data.length === 0 ? (
          <InfoMessage text="Seems that you are not enrolled in any course" />
        ) : (
          <ul className="class-list">
            {data.map(({ id, className, instructor }) => (
              <>
                <li style={{ listStyleType: "none" }} key={id}>
                  <ClassCard
                    id={id}
                    className={className}
                    instructor={instructor.fullName}
                  />
                </li>
              </>
            ))}
          </ul>
        )
        
        }
        <div className="option-buttons">
          <Button
            type="blue"
            height="45px"
            width="246px"
            text="Join a class"
            borderRadius="5px"
            onClickFunction={openJoinModal}
          />
          <Button
            type="white"
            height="45px"
            width="246px"
            text="Create a class"
            borderRadius="5px"
            onClickFunction={openCreateModal}
          />

        <JoinClassModal 
          openState={isJoinModalOpen} 
          onCloseModal={closeJoinModal} 
          onReload={fetchData}
        />

        <CreateClassModal 
          openState={isCreateModalOpen} 
          onCloseModal={closeCreateModal}
          onReload={fetchData} 
        />

        </div>
      </section>
    </div>
  );
};

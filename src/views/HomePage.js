import { Button, Modal, PageHeader, Result } from "antd";
import { ClassSetupForm } from "../components/classSetupForm";
import { Link } from "react-router-dom";

export default function HomePage({ showModal }) {
  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Class Setup" />
        <ClassSetupForm />
      </div>
      <Modal visible={showModal} footer={null} closable={false}>
        <Result
          status="success"
          title="Class information saved!"
          subTitle="You can now record student scores for this class."
          extra={
            <Button type="link" size="large">
              <Link to="/tracker" type="primary">
                Go to tracker
              </Link>
            </Button>
          }
        />
      </Modal>
    </>
  );
}

import { PostRequestDom } from "@domain/post";
import { UserDom } from "@domain/users";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup';
import {
  Button,
  Input,
  Select,
  Option
} from "@material-tailwind/react";

interface PostFormProps {
    users: UserDom[],
    onClick: (_:PostRequestDom) => void;
}

const PostFormYupMaterial = ({ users = [], onClick }: Readonly<PostFormProps>) => {

    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        userid: Yup.string().required('user is required'),
        title: Yup.string()
          .required(t("titleRequired") ?? '')
          .min(6, (t("titleMin") ?? ''))
          .max(20, (t("titleMax") ?? '')),
        body: Yup.string()
          .required('body is required')
          .min(6, 'body must be at least 6 characters')
          .max(20, 'body must not exceed 20 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<PostRequestDom>({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = (data: PostRequestDom) => onClick(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full max-w-xs mx-auto">
            <div className="grid grid-cols-1 gap-4">
                {/* Usuario */}
                <div>
                    <label htmlFor="userid">Usuario</label>
                    <Select
                        id="userid"
                        {...register("userid", { required: true })}
                    >
                        {users.map(user => (
                            <Option key={user.id} value={user.id ?? ""}>
                                {user.name}
                            </Option>
                        ))}
                    </Select>
                    <div className="text-red-500">{errors.userid?.message}</div>
                </div>

                {/* Título */}
                <div>
                    <label htmlFor="title">Título</label>
                    <Input
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} id="title"
                        {...register("title", { required: true })}
                        error={!!errors.title}
                        type="text"
                        label="Title"
                        size="lg"                    />
                    <div className="text-red-500">{errors.title?.message}</div>
                </div>

                {/* Body */}
                <div>
                    <label htmlFor="body">Body</label>
                    <Input
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} id="body"
                        {...register("body", { required: true })}
                        error={!!errors.body}
                        type="text"
                        label="Body"
                        size="lg"                    />
                    <div className="text-red-500">{errors.body?.message}</div>
                </div>

                {/* Botón de envío */}
                <div>
                    <Button color="blue" onClick={handleSubmit(onSubmit)}>
                        Register {/* texto del botón */}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default PostFormYupMaterial;


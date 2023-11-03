export type TagType = {
  id: number;
  name: string;
};

export type TagProps = TagType;

export function Tag(props: TagProps): React.ReactNode {
  return <div>{props.name}</div>;
}

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import FormModal from "$lib/modal/FormModal.svelte";
  import Modal from "$lib/modal/Modal.svelte";
  import { Tabs } from "@ubeac/svelte";

  export let data: any;
  export let open = false;
  export let editing = false;

  const dispatch = createEventDispatcher();

  // let previewItems = [
  //   { key: "index", text: $_("admin.collections.data.index") },
  //   { key: "no_index", text: $_("admin.collections.data.no-index") },
  //   { key: "not_follow", text: $_("admin.collections.data.no-follow") },
  // ];

  function save() {
    if (editing) {
      dispatch("edit", data);
    } else {
      dispatch("add", data);
    }
  }
  function cancel() {
    dispatch("cancel");
  }
  // on:save={save}
  // on:cancel={cancel}
  // title={$_("admin.collections.add_collection")}
  // size="lg"
</script>

<Modal>
  <!-- <Tabs value="1">
      <TabsItems>
        <TabsItem value="1">
          <Icon name="cog" />
          {$_("admin.collections.general.title")}
        </TabsItem>
        <TabsItem value="2">
          <Icon name="internet" />
          {$_("admin.collections.seo.title")}
        </TabsItem>
        <TabsItem value="3">
          <Icon name="document" />
          {$_("admin.collections.data.title")}
        </TabsItem>
      </TabsItems>
      <TabsPanels>
        <TabsPanel class="pt-4" value="1">
          <Row>
            <FormInput
              required
              label={$_("admin.collections.general.collection")}
              placeholder={$_("admin.collections.general.collection_placeholder")}
              bind:value={data.title}
            />
            <FormInput
              required
              label={$_("admin.collections.general.collection_url")}
              placeholder={$_(
                "admin.collections.general.collection_url_placeholder"
              )}
              bind:value={data.slug}
            />
  
            <FormRadioGroup
              required
              label={$_("admin.collections.general.collection_type")}
              key="value"
              text="text"
              items={[
                {
                  value: "manual",
                  text: $_("admin.collections.general.manual"),
                },
                {
                  value: "automat",
                  text: $_("admin.collections.general.auto"),
                },
              ]}
              bind:value={data.type}
            />
          </Row>
        </TabsPanel>
        <TabsPanel class="pt-4" value="2">
          <Row>
            <FormInput
              placeholder={$_("admin.collections.seo.meta_data_placeholder")}
              label={$_("admin.collections.seo.meta_data")}
              bind:value={data.meta_title}
            />
            <FormTextarea
              placeholder={$_(
                "admin.collections.seo.meta_description_placeholder"
              )}
              label={$_("admin.collections.seo.meta_description")}
              bind:value={data.meta_desc}
            />
          </Row>
        </TabsPanel>
        <TabsPanel class="pt-4" value="3">
          <Row>
            <FormCheckboxGroup
              inline
              label={$_("admin.collections.data.preview")}
              items={previewItems}
              bind:value={data.preview}
            />
            <FormInput
              label={$_("admin.collections.data.standard_url")}
              placeholder={$_("admin.collections.data.standard_url_placeholder")}
              bind:value={data.url}
            />
            <FormInput
              required
              label={$_("admin.collections.data.redirect")}
              placeholder={$_("admin.collections.data.redirect_placeholder")}
              bind:value={data.redirect}
            />
          </Row>
        </TabsPanel>
      </TabsPanels>
    </Tabs> -->
</Modal>
